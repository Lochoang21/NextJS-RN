'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                NextJS App ©{new Date().getFullYear()} Created by David Bao Loc
            </Footer>
        </>
    )
}

export default AdminFooter;