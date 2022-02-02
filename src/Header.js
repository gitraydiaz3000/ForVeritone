import { AppBar, Button, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import {Link as RouterLink} from "react-router-dom";

  const headersData = [
    {
      label: "Base",
      href: "/base",
    },
    {
      label: "Add",
      href: "/add",
    },
    {
      label: "Edit",
      href: "/edit",
    },
    {
      label: "Shopping List",
      href: "/shoppinglist",
    },
  ];
  
  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "#400CCC",
    }
  }));
           
  export default function Header() {


    const { header, logo } = useStyles();

    const displayDesktop = () => {
        return (
          <Toolbar>Shopping List        
            {/* getMenuButtons() */}
          </Toolbar>
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
        <AppBar>{displayDesktop()}</AppBar>
      </header>
    );
  }