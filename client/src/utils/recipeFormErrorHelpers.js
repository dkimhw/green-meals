
export const recipeServerSideError = async (statusCode, data) => {
  if (statusCode === 422) {
    const { errors } = data;
    console.log("errors", errors);
    console.log(errors[0]['recipeName']);

    const errMsgs = {};
    for(let error of errors) {
      console.log(error);
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
