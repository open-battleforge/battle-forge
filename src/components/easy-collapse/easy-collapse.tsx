import React from 'react';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';

type props = {
  children: any,
  buttonProps: any,
  openText: string,
  closeText: string
}

export const EasyCollapse = (props: props) => {
  const { children, buttonProps } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
      {!isOpen && <Button fullWidth onClick={handleToggle} { ...buttonProps }>{props.openText || 'More'}</Button>}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
      {!!isOpen && <Button fullWidth onClick={handleToggle} { ...buttonProps }>{props.closeText || 'Less'}</Button>}
    </>
  );
};
