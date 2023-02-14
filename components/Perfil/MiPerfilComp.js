import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import img1 from '@/pages/assets/images/users/prfileMag2.jpg';
import Image from 'next/image';
import TwoColumnComp from '../twoColumn/TwoColumnComp';
import LeftMenu from './leftMenu';
import RightMenu from './rightMenu';
import Link from 'next/link';

const MiPerfilComp = () => {
  return (
    <Card className='border-0'>
      <CardBody className="text-center p-4 border-bottom">
        <Image src={img1} className="rounded-circle" width={200} height={200}  alt="avatar" />
        <CardTitle style={{color:"#077cab"}} tag="h4" className="fw-bold mt-3 mb-2">
          Magdiel Jiménez Tabla
        </CardTitle>
        <CardSubtitle className="text-muted">magdiel.jimenez.com@freebug.mx</CardSubtitle>
        <div className='d-flex align-items-center justify-content-center mt-4 gap-2'>
            <Link href='/' className='badge bg-primary text-white rounded-pill text-decoration-none'>Administrador</Link>
            

        </div>
      </CardBody>
      <CardBody>
          <TwoColumnComp/>
      </CardBody>
    </Card>
  );
};

export default MiPerfilComp;
