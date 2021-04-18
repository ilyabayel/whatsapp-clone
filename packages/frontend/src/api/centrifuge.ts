import Centrifuge from "centrifuge";

const c = new Centrifuge(process.env.CENTRIFUGE_URL);

c.on("connect", (ctx) => {
  console.log("connected", ctx);
});

c.on("disconnect", (ctx) => {
  console.log("disconnect", ctx);
});

c.on("publish", (ctx) => {
  console.log(ctx);
});

export const centrifuge = c;
