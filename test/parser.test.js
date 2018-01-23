import parse from "../src/logic/index";
import { readHtml, readJson } from "./util";

test("extract meta afisha", () => {
  const pageContent = readHtml('./cases/afisha_mail_ru.html');
  const pageRes = readJson('./cases/afisha_mail_ru.json');

  return parse(pageContent).then((parsed) => {
    expect(parsed).toEqual(pageRes);
  })
});

test("extract meta auto", () => {
  const pageContent = readHtml('./cases/auto_mail_ru.html');
  const pageRes = readJson('./cases/auto_mail_ru.json');

  return parse(pageContent).then((parsed) => {
    expect(parsed).toEqual(pageRes);
  })
});

test("extract meta lenta", () => {
  const pageContent = readHtml('./cases/lenta_ru.html');
  const pageRes = readJson('./cases/lenta_ru.json');

  return parse(pageContent).then((parsed) => {
    expect(parsed).toEqual(pageRes);
  })
});

test("extract meta bulma", () => {
  const pageContent = readHtml('./cases/bulma_io.html');
  const pageRes = readJson('./cases/bulma_io.json');

  return parse(pageContent).then((parsed) => {
    expect(parsed).toEqual(pageRes);
  })
});

test("extract meta zenpencil", () => {
  const pageContent = readHtml('./cases/zenpencil_com.html');
  const pageRes = readJson('./cases/zenpencil_com.json');

  return parse(pageContent).then((parsed) => {
    expect(parsed).toEqual(pageRes);
  })
});