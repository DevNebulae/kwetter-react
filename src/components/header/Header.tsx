import * as React from "react";
import { Link } from "react-router-dom";
import { RowSpacer } from "../layout/row-spacer/RowSpacer";

import "./styles.css";

export const Header: React.StatelessComponent = props => (
  <header className="application__header">
    <h1>Kwetter</h1>

    <RowSpacer />

    <nav>
      <Link to="/">Home</Link>
      <a href="http://localhost:8082/auth/realms/kwetter/edit">Edit account</a>
    </nav>
  </header>
);
