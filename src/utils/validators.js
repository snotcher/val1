export const isEmail = (value) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value);

export const isNotEmpty = (value) => !!value && String(value).trim().length > 0;
