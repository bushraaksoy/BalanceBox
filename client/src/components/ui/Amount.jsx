import { formatAmount } from '../../utils/formatAmount';

const Amount = ({ amount }) => {
    return <span>{formatAmount(amount)}</span>;
};

export default Amount;
