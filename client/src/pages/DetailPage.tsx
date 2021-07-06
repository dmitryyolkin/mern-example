import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";
import { ILink } from "../interfaces";

interface ParamTypes {
  id: string;
}

export const DetailPage: React.FC = () => {
  const [link, setLink] = useState<ILink | null>(null);
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  // get param id from http params request
  // id name is taken from routes.tsx -> <Route path="/detail/:id">
  const linkId = useParams<ParamTypes>().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {!loading && link && <LinkCard link={link} />}
    </React.Fragment>
  );
};
