import { TThumbnail, Thumbnail } from "..";
import "./Avatar.scss";

type IAvatar = {
  borderRadius?: number;
  bgColorClass?: string;
  label?: string;
  image: string;
  size?: number;
};
export const Avatar = (props: Omit<TThumbnail, "src" | "alt"> & IAvatar) => {
  const {
    label,
    image,
    width,
    height,
    size,
    borderRadius,
    bgColorClass,
    ...rest
  } = props;

  const defaultSize = size || 30;
  return (
    <div className='avatar-37gh d-flex align-items-center justify-content-start '>
      <div
        className={`d-flex align-items-center justify-content-center ${bgColorClass}`}
        style={{
          width: `${(defaultSize + 5) * 0.1}rem`,
          height: `${(defaultSize + 5) * 0.1}rem`,
          borderRadius: borderRadius || `${defaultSize * 0.035}rem`,
        }}
      >
        <Thumbnail
          {...rest}
          src={image}
          alt='user avatar'
          width={defaultSize}
          height={defaultSize}
        />
      </div>
      {label && <p className='ms-2'>{label}</p>}
    </div>
  );
};
