import { useState } from "react";
import PropTypes from "prop-types";

const SidebarLinkGroup = ({ children, activeCondition }) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

SidebarLinkGroup.propTypes = {
  children: PropTypes.func.isRequired,
  activeCondition: PropTypes.bool.isRequired,
};

export default SidebarLinkGroup;
