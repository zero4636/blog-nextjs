export default function CateList({ categories }) {
    return (
        <>
            {categories.map(({ name, description }, index) => {
                const isLast = index === categories.length - 1;
                const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                return (
                    <tr key={index}>
                        <td className={classes}>
                            <div className="flex flex-col">
                                {index + 1}
                            </div>
                        </td>
                        <td className={classes}>
                            <div className="flex flex-col">
                                {name}
                            </div>
                        </td>
                        <td className={classes}>
                            <div className="flex flex-col">
                                {description}
                            </div>
                        </td>
                        <td className={classes}>
                            <div className="flex flex-col">
                                edit
                            </div>
                        </td>
                    </tr>
                );
            })}
        </>
    );
}