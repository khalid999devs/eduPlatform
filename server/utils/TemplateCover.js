const EmailCover = (body) => {
  return (
    body +
    `
    --Chemgenie
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
