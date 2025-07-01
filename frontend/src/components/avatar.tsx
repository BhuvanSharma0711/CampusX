import React from 'react';

interface AvatarProps {
  src: string;
  alt?: string;
  smSize?: number;
  mdSize?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  smSize = 60,
  mdSize = 90,
}) => {
  return (
    <>
      <div className="avatar-wrapper">
        <img src={src} alt={alt} className="avatar-img" />
      </div>

      <style>{`
        .avatar-wrapper {
          border-radius: 9999px;
          overflow: hidden;
          display: inline-block;
          width: ${smSize}px;
          height: ${smSize}px;
        }

        @media (min-width: 768px) {
          .avatar-wrapper {
            width: ${mdSize}px;
            height: ${mdSize}px;
          }
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>
    </>
  );
};

export default Avatar;
