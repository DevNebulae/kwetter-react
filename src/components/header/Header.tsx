import * as React from "react";
import { Link } from "react-router-dom";
import { kc } from "../..";
import { RowSpacer } from "../layout/row-spacer/RowSpacer";

import "./styles.css";

export const Header: React.StatelessComponent = props => (
  <header className="application__header">
    <h1>Kwetter</h1>

    <RowSpacer />

    <nav>
      <Link to="/" style={{ marginRight: "12px" }}>
        Home
      </Link>
      <Link to={`/profile/${kc.subject}`} style={{ marginRight: "12px" }}>
        My profile
      </Link>
      <a href="http://localhost:8082/auth/realms/kwetter/account">
        Edit account
      </a>
    </nav>
  </header>
);
