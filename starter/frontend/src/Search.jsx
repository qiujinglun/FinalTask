import { useState } from "react";

export default function Search({ onSearch }) {
    const [keyword, setKeyword] = useState({
        mode: "date",
        value: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setKeyword((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(keyword);
    }

    function handleReset() {
        const reset = { mode: "date", value: "" };
        setKeyword(reset);
        onSearch(reset);
    }

    return (
        <form className="card" onSubmit={handleSubmit}>
            <h2>搜尋面板</h2>

            <select name="mode" value={keyword.mode} onChange={handleChange}>
                <option value="Name">依名字搜尋</option>
                <option value="date">依日期搜尋</option>
                <option value="item">依項目搜尋</option>
                <option value="bodyPart">依部位搜尋</option>
                <option value="isCompleted">是否完成</option>
            </select>
            {keyword.mode === "Name" && (
                <input
                    type="text"
                    name="value"
                    placeholder="請輸入使用者名稱"
                    value={keyword.value}
                    onChange={handleChange}
                />
            )

            }
            {keyword.mode === "date" && (
                <input
                    type="date"
                    name="value"
                    value={keyword.value}
                    onChange={handleChange}
                />
            )}

            {keyword.mode === "item" && (
                <select name="value" value={keyword.value} onChange={handleChange}>
                    <option value="">請選擇運動</option>
                    <option value="臥推">臥推</option>
                    <option value="引體向上">引體向上</option>
                    <option value="深蹲">深蹲</option>
                    <option value="肩推">肩推</option>
                </select>
            )}

            {keyword.mode === "bodyPart" && (
                <select name="value" value={keyword.value} onChange={handleChange}>
                    <option value="">請選擇部位</option>
                    <option value="胸">胸</option>
                    <option value="背">背</option>
                    <option value="腿">腿</option>
                    <option value="肩">肩</option>
                    <option value="手臂">手臂</option>
                    <option value="核心">核心</option>
                </select>
            )}
            {keyword.mode === "isCompleted" && (
                <select name="value" value={keyword.value} onChange={handleChange}>
                    <option value="">請選擇狀態</option>
                    <option value="true">已完成</option>
                    <option value="false">未完成</option>
                </select>
            )}
            <button type="submit" className="add">
                搜尋
            </button>
            <button type="button" onClick={handleReset} className="delete">
                清除
            </button>
        </form>
    );
}