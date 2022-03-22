import './AllEntities.module.scss';

/* eslint-disable-next-line */
export interface AllEntitiesProps {}

const entityData = {
  term: "term description",
  vocabularyList: "A vocabulary list gathers terms with filters that apply within the context of the vocabulary list",
  tag: "A tag is a classifier for an entity or a pair of related entities"
}

export function AllEntities(props: AllEntitiesProps) {
  return (
    <div>
      <h1>Welcome to AllEntities!</h1>
      <p>{Object.entries(entityData).map(([entityType,description])=>(<p>{entityType}:{description}</p>))}</p>
    </div>
  );
}

export default AllEntities;
