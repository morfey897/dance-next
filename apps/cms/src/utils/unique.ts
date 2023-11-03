import { Reference, ReferenceFilterResolverContext, ReferenceFilterSearchOptions } from 'sanity';

export function filterUnique(groupName?:string) {
  return (context: ReferenceFilterResolverContext): ReferenceFilterSearchOptions | Promise<ReferenceFilterSearchOptions> => {
    const group = groupName && context.document[groupName];
    const [token] = context.parentPath;
    const referencies = (context.document[String(token)] || []) as Array<Reference>;
    const existing = referencies.map((ref) => ref._ref).filter(Boolean);
    return {
      filter: ['!(_id in $existing)', group && '(_type == $group)']
        .filter(a => Boolean(a))
        .join(' && '),
      params: {
        existing,
        group
      }
    }
  }
}