import React from 'react';
import PropTypes from 'prop-types';
import { Slide } from 'pure-react-carousel';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Image from '../../Utils/Image';

const LINK = 'link';

const ImageContainer = styled.div`
  display: block;
  height: 8rem;
  position: relative;
  width: 100%;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

const ImageText = styled.span`
  display: -webkit-box;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1;
  margin: 0.5rem 0 1rem;
  max-height: 2rem;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  ${media.lessThan('large')`
    margin-bottom: 0;
  `}

  ${media.lessThan('medium')`
    max-height: none;
  `}
`;

const SlideWrapper = styled(Slide)`
  ${({ role }) =>
    role === LINK
      ? css`
          cursor: pointer;
          span {
            text-decoration: underline;
          }
        `
      : undefined}
`;

const SlideContent = styled.article`
  height: 10rem;
  overflow: hidden;
  padding: 0 0 1rem;
  margin: 0;

  ${media.lessThan('large')`
    padding-bottom: 0;
  `}

  ${media.lessThan('medium')`
    height: auto;
    padding-bottom: 0;
  `}
`;

const LadderSlide = ({
  currentSlide,
  img,
  title,
  href,
  redirect,
}) => {
  const role = href ? LINK : undefined;
  const label = title.toLowerCase().replace(/\s/gi, '-');
  const isLink = role === LINK;

  const navigate = React.useCallback(() => {
    if (!isLink) return;
    if (typeof redirect === 'function') {
      redirect(href);
    }
  }, []);

  return (
    <SlideWrapper
      index={currentSlide}
      {...(isLink
        ? {
            'aria-labelledby': label,
            'data-href': href,
            onClick: navigate,
            onKeyPress: navigate,

            role,
          }
        : {})}
    >
      <SlideContent>
        <ImageContainer>
          <Image srcList={img} />
        </ImageContainer>
        <ImageText id={label}>{title}</ImageText>
      </SlideContent>
    </SlideWrapper>
  );
};

LadderSlide.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  redirect: PropTypes.func,
};

LadderSlide.defaultProps = {
  href: '',
  redirect: undefined,
};

export default LadderSlide;