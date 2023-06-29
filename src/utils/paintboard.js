import { createFastboard, mount } from "@netless/fastboard";
import { getRoomUUID, getRoomToken} from "../api/secret.js";

let app;
async function mountFastboard(div) {
  const roomUUId =
  await getRoomUUID("123456").then(res => {

  })
  app = await createFastboard({
    sdkConfig: {
      appIdentifier: "AvqLkBWCEe6IHCl_Ck-bAw/uiDogVuvylNn5w",
      region: "cn-hz",
    },
    joinRoom: {
      uid: "用户 uid",
      uuid: "房间 UUID",
      roomToken: "房间 Token",
    },
    managerConfig: {
      cursor: true,
    },
  });
  window.app = app;
  return mount(this.app, div);
}

mountFastboard(document.getElementById("app"));
