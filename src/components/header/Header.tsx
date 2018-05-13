import * as React from "react";
import styled from "react-emotion";
import { Link } from "react-router-dom";
import { kc } from "../..";
import { RowSpacer } from "../layout/row-spacer/RowSpacer";

const HeaderWrapper = styled("header")`
  height: 56px;
  line-height: 56px;
  display: flex;
  flex-direction: row;
  grid-column: span 12;
  box-sizing: border-box;
  padding: 0 24px;
`;

export const Header: React.StatelessComponent = props => (
  <HeaderWrapper>
    <h1>Kwetter</h1>

    <RowSpacer />

    <nav>
      <Link to="/" style={{ marginRight: "12px" }}>
        Home
      </Link>
      <Link to="/search" style={{ marginRight: "12px" }}>
        Search tweets
      </Link>
      <Link to={`/profile/${kc.subject}`} style={{ marginRight: "12px" }}>
        My profile
      </Link>
      <a
        href="http://localhost:8082/auth/realms/kwetter/account"
        style={{ marginRight: "12px" }}
      >
        Edit account
      </a>
      <a href="javascript:void" onClick={kc.logout}>
        Logout
      </a>
    </nav>
  </HeaderWrapper>
);
