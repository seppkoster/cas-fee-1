Handlebars.registerHelper("formatDate", (date) => {
  return moment(new Date(date)).format("DD.MM.YYYY");
});
