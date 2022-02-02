import { AppBar, Button, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import {Link as RouterLink} from "react-router-dom";

  const headersData = [
  ];
  
  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "lightgrey",
    }
  }));
           
  export default function Header2() {


    const { header, logo } = useStyles();

    const displayDesktop = () => {
        return (
          <div className="navBar2">Shopping List</div>
          
        );
      };

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
          return (
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: RouterLink,
              }}
            >
              {label}
            </Button>
          );
        });
      };

    return (
      <header>
        {displayDesktop()}
      </header>
    );
  }
