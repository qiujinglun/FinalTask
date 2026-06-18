import React, { useMemo } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function Count({ events }) {

    const userGroups = useMemo(() => {
        return events.reduce((acc, event) => {
            const user = event.userName || "未命名";

            if (!acc[user]) {
                acc[user] = [];
            }

            acc[user].push(event);

            return acc;
        }, {});
    }, [events]);

    const renderList = (data) => {
        const entries = Object.entries(data || {});

        if (entries.length === 0) return <p>沒有資料</p>;

        return entries.map(([key, value]) => (
            <p key={key}>
                {key}：{value} 次
            </p>
        ));
    };



    const exportPDF = async (userName) => {
        const input = document.getElementById(
            `report-${userName}`
        );

        if (!input) return;

        const canvas = await html2canvas(input, {
            backgroundColor: "white",
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);

        const pdfHeight =
            (imgProps.height * pdfWidth) /
            imgProps.width;

        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            pdfWidth,
            pdfHeight
        );

        pdf.save(`${userName}-fitness-report.pdf`);
    };


    return (
        <>
            {Object.entries(userGroups).map(([userName, userEvents]) => {
                const exerciseCount = {};
                const bodyCount = {};

                userEvents.forEach((event) => {
                    const reps = Number(event.reps) || 0;

                    exerciseCount[event.exerciseName] =
                        (exerciseCount[event.exerciseName] || 0) + reps;

                    bodyCount[event.bodyPart] =
                        (bodyCount[event.bodyPart] || 0) + reps;
                });

                const total = Object.values(bodyCount).reduce(
                    (sum, count) => sum + count,
                    0
                );

                return (
                    <section
                        className="card"
                        id={`report-${userName}`}
                        key={userName}
                    >
                        <h1>{userName} 個人報告</h1>

                        <h2>訓練統計</h2>
                        {renderList(exerciseCount)}

                        <h2>部位統計</h2>
                        {renderList(bodyCount)}

                        <h2>部位比例</h2>

                        {Object.entries(bodyCount).map(([part, count]) => (
                            <p key={part}>
                                {part}：
                                {total === 0
                                    ? 0
                                    : ((count / total) * 100).toFixed(1)}
                                %
                            </p>
                        ))}

                        <button
                            onClick={() => exportPDF(userName)}
                        >
                            匯出 {userName} PDF
                        </button>
                    </section>
                );
            })}
        </>
    );
}