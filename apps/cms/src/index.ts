import type { StructureBuilder, ListItemBuilder, ListItem, Divider } from "sanity/desk";
import { HomeIcon } from '@sanity/icons'

import root from "./settings";
import { types as settings } from "./settings";

import { types as internal } from "./internal";

import { types as base } from "./schemas";
import { getDivider } from "./utils/divider";

export const schemaTypes = [root, ...internal, getDivider(), ...base, getDivider(), ...settings];

export const deskStructure = (S: StructureBuilder) => {

  const documents = S.documentTypeListItems();

  return S.list()
    .title('Content')
    .items(schemaTypes
      .map((data) => {
        if (data.type === 'divider') return S.divider();
        if (data.type === 'document') {
          if (data.name === root.name) return S.listItem()
            .title(root.title || root.name)
            .icon(HomeIcon)
            .child(
              S.editor()
                .title(root.title || root.name)
                .schemaType(root.name)
                .documentId(root.name)
            );
          return documents.find(doc => doc.getId() === data.name);
        }
      })
      .filter(Boolean) as Array<(ListItemBuilder | ListItem | Divider)>);
}
