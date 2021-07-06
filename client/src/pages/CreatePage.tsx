import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import { useHistory } from "react-router-dom";

export const CreatePage: React.FC = () => {
  const [link, setLink] = useState<string>("");
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();

  const pressHandler = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className="row create-link-pd-top">
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            placeholder="Input link"
            id="link"
            type="text"
            value={link}
            onChange={(event) => {
              setLink(event.target.value);
            }}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link" className="active">
            Link
          </label>
        </div>
      </div>
    </div>
  );
};
