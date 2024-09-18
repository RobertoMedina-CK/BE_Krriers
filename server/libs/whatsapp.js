import axios from "axios";

export const sendWA = async () => {
  const options = {
    method: "POST",
    url: "https://api.whatsender.io/v1/messages",
    headers: {
      "Content-Type": "application/json",
      Token:
        "a5f3e31e292ca94e753f059f929978004755682e6836caf9bfa941488bef8a2bd3b0fb6abfefd67c",
    },
    data: {
      phone: "+19566009878",
      media: { file: "66bfd8970ce2677ac2275dee" },
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
