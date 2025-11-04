'use client';

import React, { useEffect, useRef, useState } from 'react';

type ThemeOption = 'light' | 'dark';

type Props = {
  theme: ThemeOption;
  onChangeTheme: (t: ThemeOption) => void;
};

const ThemeSwitcher: React.FC<Props> = ({ theme, onChangeTheme }) => {
  const fieldsetRef = useRef<HTMLFieldSetElement | null>(null);
  const [prev, setPrev] = useState<'1' | '2'>('1');

  useEffect(() => {
    const el = fieldsetRef.current;
    if (!el) return;
    // initialize previous based on current theme
    const map: Record<ThemeOption, '1' | '2'> = { light: '1', dark: '2' };
    const initial = map[theme];
    setPrev(initial);
    el.setAttribute('c-previous', initial);
  }, []);

  useEffect(() => {
    const el = fieldsetRef.current;
    if (!el) return;
    const map: Record<ThemeOption, '1' | '2'> = { light: '1', dark: '2' };
    const now = map[theme];
    el.setAttribute('c-previous', prev);
    setPrev(now);
  }, [theme]);

  return (
    <div className="switcher-wrapper">
      <fieldset className="switcher" ref={fieldsetRef}>
        <legend className="switcher__legend">Choose theme</legend>
        <label className="switcher__option">
          <input
            className="switcher__input"
            type="radio"
            name="theme"
            value="light"
            c-option="1"
            checked={theme === 'light'}
            aria-label="Light theme"
            onChange={() => onChangeTheme('light')}
          />
          <svg className="switcher__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
            <path fill="var(--c)" fillRule="evenodd" d="M18 12a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd"/>
            <path fill="var(--c)" d="M17 6.038a1 1 0 1 1 2 0v3a1 1 0 0 1-2 0v-3ZM24.244 7.742a1 1 0 1 1 1.618 1.176L24.1 11.345a1 1 0 1 1-1.618-1.176l1.763-2.427ZM29.104 13.379a1 1 0 0 1 .618 1.902l-2.854.927a1 1 0 1 1-.618-1.902l2.854-.927ZM29.722 20.795a1 1 0 0 1-.619 1.902l-2.853-.927a1 1 0 1 1 .618-1.902l2.854.927ZM25.862 27.159a1 1 0 0 1-1.618 1.175l-1.763-2.427a1 1 0 1 1 1.618-1.175l1.763 2.427ZM19 30.038a1 1 0 0 1-2 0v-3a1 1 0 1 1 2 0v3ZM11.755 28.334a1 1 0 0 1-1.618-1.175l1.764-2.427a1 1 0 1 1 1.618 1.175l-1.764 2.427ZM6.896 22.697a1 1 0 1 1-.618-1.902l2.853-.927a1 1 0 1 1 .618 1.902l-2.853.927ZM6.278 15.28a1 1 0 1 1 .618-1.901l2.853.927a1 1 0 1 1-.618 1.902l-2.853-.927ZM10.137 8.918a1 1 0 0 1 1.618-1.176l1.764 2.427a1 1 0 0 1-1.618 1.176l-1.764-2.427Z"/>
          </svg>
        </label>
        <label className="switcher__option">
          <input
            className="switcher__input"
            type="radio"
            name="theme"
            value="dark"
            c-option="2"
            checked={theme === 'dark'}
            aria-label="Dark theme"
            onChange={() => onChangeTheme('dark')}
          />
          <svg className="switcher__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
            <path fill="var(--c)" d="M12.5 8.473a10.968 10.968 0 0 1 8.785-.97 7.435 7.435 0 0 0-3.737 4.672l-.09.373A7.454 7.454 0 0 0 28.732 20.4a10.97 10.97 0 0 1-5.232 7.125l-.497.27c-5.014 2.566-11.175.916-14.234-3.813l-.295-.483C5.53 18.403 7.13 11.93 12.017 8.77l.483-.297Zm4.234.616a8.946 8.946 0 0 0-2.805.883l-.429.234A9 9 0 0 0 10.206 22.5l.241.395A9 9 0 0 0 22.5 25.794l.416-.255a8.94 8.94 0 0 0 2.167-1.99 9.433 9.433 0 0 1-2.782-.313c-5.043-1.352-8.036-6.535-6.686-11.578l.147-.491c.242-.745.573-1.44.972-2.078Z"/>
          </svg>
        </label>
        <div className="switcher__filter">
          <svg>
            <filter id="switcher" primitiveUnits="objectBoundingBox">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.04" result="blur"/>
              <feDisplacementMap id="switcher-disp" in="blur" in2="blur" scale="0.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="toggler" primitiveUnits="objectBoundingBox">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.01" result="blur"/>
              <feDisplacementMap id="disp2" in="blur" in2="blur" scale="0.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
        </div>
      </fieldset>
    </div>
  );
};

export default ThemeSwitcher;


