import classes from './Divider.module.css';

const Divider = (props) => {
  return (
    <div className={classes.divider}>
      <span>{props.children}</span>
    </div>
  );
};


export default Divider;
