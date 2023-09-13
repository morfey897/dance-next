import { AssetType } from "@/models/_default";


const equal = (filterTag: string, tag: string) => filterTag === tag;
const notEqual = (filterTag: string, tag: string) => filterTag !== tag;

export const findImage = (images: Array<AssetType> | undefined | null, tag: string) => {

  const notEq = tag[0] === '!';
  let comparator = equal;
  if (notEq) {
    tag = tag.slice(1);
    comparator = notEqual;
  }
  return images?.find(img => !!img?.tags?.find(code => comparator(tag, code.tag)));
}