import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function HomeBreadcrumbItem() {
  return (
    <li className="breadcrumbs__item">
      <Link className="breadcrumbs__link" href={useBaseUrl('/')}>
        Server Admin Core
      </Link>
    </li>
  );
}
