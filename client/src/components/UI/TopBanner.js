
import classes from './TopBanner.module.css';

const TopBanner = (props) => {
  // Add styles to top banner passed via props
  let styles = {};
  for (let [key, prop] of Object.entries(props.classStyles)) {
    styles[key] = prop;
  };

  return (
    <div
      className={classes['top-banner']}
      style={styles}
      // style={{background: "url(/add-recipe-background-header-img.png) top repeat-x" }}
    >
    </div>
  )
}

export default TopBanner;
