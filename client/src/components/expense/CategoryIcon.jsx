import { expenseCategoryColors, expenseCategoryIcons } from '../../constants/constants';

const CategoryIcon = ({ category }) => {
    const colors = expenseCategoryColors[category] || expenseCategoryColors.OTHER;
    const icon = expenseCategoryIcons[category] || expenseCategoryIcons.OTHER;

    return (
        <div
            className="category-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl [&_svg]:h-4 [&_svg]:w-4"
            style={{ backgroundColor: colors.bg, color: colors.color }}
        >
            {icon}
        </div>
    );
};

export default CategoryIcon;
