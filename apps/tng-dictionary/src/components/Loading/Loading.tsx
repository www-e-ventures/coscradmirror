import './Loading.module.css';

/* eslint-disable-next-line */
export interface LoadingProps {
  nameToDisplay: string;
}

export function Loading({nameToDisplay}: LoadingProps) {
  return (
    <div>
      <h1>{`Loading ${nameToDisplay}...`}</h1>
    </div>
  );
}

export default Loading;
