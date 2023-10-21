const EmailCover = (body) => {
  return (
    body +
    `
 
 `
  );
};

const EmailTextCover = (text) => {
  return (
    text +
    `

 `
  );
};

module.exports = { EmailCover, EmailTextCover };
