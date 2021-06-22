import React from "react";
export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>
        Link from:{" "}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Link to:{" "}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Link's clicks: <strong>{link.clicks}</strong>
      </p>
      <p>
        Creation date:{" "}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};
