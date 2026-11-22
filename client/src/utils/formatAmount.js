const amountFormat = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
});

export const formatAmount = (value) => {
    const number = Number(String(value ?? '').replace(/,/g, ''));
    if (!Number.isFinite(number)) return '0';
    return amountFormat.format(number);
};

export const formatTypedAmount = (raw) => {
    const cleaned = String(raw)
        .replace(/[^\d.]/g, '')
        .replace(/^(\d*\.?\d{0,2}).*$/, '$1');
    if (!cleaned) return '';
    const [whole, fraction] = cleaned.split('.');
    const grouped = whole ? formatAmount(whole) : '0';
    if (cleaned.endsWith('.')) return `${grouped}.`;
    if (fraction !== undefined) return `${grouped}.${fraction}`;
    return grouped;
};
