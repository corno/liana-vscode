export const quote_identifier = (id: string): string => "'" + id
    .replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    .replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t')
    + "'"
