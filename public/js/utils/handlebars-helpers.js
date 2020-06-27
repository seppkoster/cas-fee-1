Handlebars.registerHelper("formatDate", (date) => {
  return moment(new Date(date)).format("DD.MM.YYYY");
});

Handlebars.registerHelper("formatDateInput", function (date) {
  return moment(date).format("YYYY-MM-DD");
});

Handlebars.registerHelper('transformLineBreaks', function(plaintext) {
  const output = plaintext.split(/\r\n|\r|\n/g).reduce((out,line)=>out+=`${line}<br>`,'');
  return new Handlebars.SafeString(output);
});

Handlebars.registerHelper("times", function (n, block) {
  let accum = "";
  for (let i = 0; i < n; ++i) {
    block.data.index = i;
    block.data.first = i === 0;
    block.data.last = i === n - 1;
    accum += block.fn(this);
  }
  return accum;
});

Handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue,
  }[operator];
});

Handlebars.registerHelper("when", function (
  operand_1,
  operator,
  operand_2,
  options
) {
  var operators = {
      eq: function (l, r) {
        return l == r;
      },
      noteq: function (l, r) {
        return l != r;
      },
      gt: function (l, r) {
        return Number(l) > Number(r);
      },
      or: function (l, r) {
        return l || r;
      },
      and: function (l, r) {
        return l && r;
      },
      "%": function (l, r) {
        return l % r === 0;
      },
    },
    result = operators[operator](operand_1, operand_2);

  if (result) return options.fn(this);
  else return options.inverse(this);
});
