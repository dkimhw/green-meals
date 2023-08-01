


export const cleanRecipeServerSideErrors = async (statusCode, data) => {
  if (statusCode === 422) {
    const { errors } = data;

    const errMsgs = {};
    for(let error of errors) {
      Object.entries(error).forEach(el => {
        if (el[0] in errMsgs) {
          errMsgs[el[0]].append(el[1]);
        } else {
          errMsgs[el[0]] = [el[1]];
        }
      })
    }

    return errMsgs;
  }
}
