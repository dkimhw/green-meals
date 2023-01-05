
import classes from './TopBanner.module.css';

const TopBanner = (props) => {
  let styles = {}

  console.log("topbanner: ", Object.entries(props.classStyles))
  for (let [key, prop] of Object.entries(props.classStyles)) {
    styles[key] = prop;
  }

  console.log("styles", styles)

  return (
    <div
      className={classes['top-banner']}
      style={styles}
      // style={{background: "url(/add-recipe-background-header-img.png) top repeat-x" }}
    >
      ""
    </div>
  )
}

export default TopBanner;
