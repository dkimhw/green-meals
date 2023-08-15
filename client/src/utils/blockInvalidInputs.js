

export const blockInvalidNumberInput = (evt) => {
  return ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault();
};
