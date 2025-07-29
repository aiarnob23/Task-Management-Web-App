const sendResponse = (res, data) => {
  res.json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    redirect:data.redirect,
  });
};

export default sendResponse;
