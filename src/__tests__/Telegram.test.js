const { handleMessage, sendMessage } = require("../controller/lib/Telegram");
const { axiosInstance } = require("../controller/lib/axios");

jest.mock("../controller/lib/axios");

describe("Telegram Bot", () => {
  describe("handleMessage", () => {
    it("should handle the /start command", async () => {
      const messageObj = { text: "/start", chat: { id: 12345 } };
      axiosInstance.get.mockResolvedValue({ data: {} });

      await handleMessage(messageObj);

      expect(axiosInstance.get).toHaveBeenCalledWith("sendMessage", {
        chat_id: 12345,
        text: expect.stringContaining("Hello! I am Kwike:)"),
      });
    });

    it("should handle the /cancel command", async () => {
      const messageObj = { text: "/cancel", chat: { id: 12345 } };
      axiosInstance.get.mockResolvedValue({ data: {} });

      await handleMessage(messageObj);

      expect(axiosInstance.get).toHaveBeenCalledWith("sendMessage", {
        chat_id: 12345,
        text: "Session has been cancelled. Type /start to start again.",
      });
    });
  });
});
