import { useMemo } from "react";

export default function Ranking({ events }) {
    const ranking = useMemo(() => {
        const users = events.reduce((acc, event) => {
            const userName = event.userName || "未命名";
            const reps = Number(event.reps) || 0;
            const weight = Number(event.weight) || 0;


            if (!acc[userName]) {
                acc[userName] = {
                    userName,
                    totalReps: 0,
                    totalWeight: 0,
                    sessions: 0,
                };
            }

            acc[userName].totalReps += reps;
            acc[userName].totalWeight += weight;
            acc[userName].sessions += 1;
            return acc;
        }, {});

        return Object.values(users).sort((a, b) => b.totalReps - a.totalReps);
    }, [events]);

    return (
        <section className="card">
            <h2>使用者訓練排行</h2>
            {ranking.length === 0 ? (
                <p>目前沒有訓練紀錄。</p>
            ) : (
                <ol>
                    {ranking.map((user) => {
                        const averageWeight = user.sessions
                            ? (user.totalWeight / user.sessions).toFixed(1)
                            : 0;

                        return (
                            <li key={user.userName}>
                                <strong>{user.userName}</strong>
                                <p>總訓練次數：{user.totalReps} 次</p>
                                <p>訓練場次：{user.sessions} 筆</p>
                                <p>平均重量：{averageWeight} kg</p>
                            </li>
                        );
                    })}
                </ol>
            )}
        </section>
    );
}
