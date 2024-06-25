import {GetServerSidePropsContext, NextPage} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {AdService} from "../../../services/AdService";
import {SSRConfig} from "next-i18next";
import {CustomAdTypeFull} from "../../../interfaces/CustomAd";
import {
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {NormalAdTypeFormProps} from "../../../components/ad/NormalAdTypeForm";
import NormalAdTypeModal from "../../../components/ad/NormalAdTypeModal";
import axios from "axios";

const AdminAdTypeIndexPage: NextPage < SSRConfig & {
  types: CustomAdTypeFull[]
} > = (props) => {
  const router = useRouter();
  const {onOpen, isOpen, onClose} = useDisclosure();
  const [modalValues, setModalValues] = useState < NormalAdTypeFormProps > ({
    sentValues: {},
    method: '',
    action: '',
    onFinished: () => {}
  });

  const handleClick = async (typeID : number, action : string) => {
    if (action == 'DELETE') {
      let result = await axios({
        url: '/api/ad/type/delete',
        data: {
          normalAdTypeID: typeID
        },
        method: action
      });
      return router.push('/admin-ad/type');
    };

    if (action == 'ADD') 
      setModalValues({
        sentValues: {},
        action: action,
        method: 'POST',
        onFinished: () => {}
      })
     else if (action == 'UPDATE') {
      let selectedType = props.types.find((x) => x.CustomAdTypeID == typeID);
      setModalValues({
        sentValues: selectedType !,
        action: action,
        method: 'PUT',
        onFinished: () => {}
      })
    }
    onOpen();
  };

  return (
    <>
      <NormalAdTypeModal isOpen={isOpen}
        onClose={onClose}
        {...modalValues}/>
      <Flex direction={'column'}
        align={'center'}
        marginBlock={'3rem'}>
        <Button onClick={
            (e) => handleClick(-1, 'ADD')
          }
          width={'150px'}>
          ADD AD TYPE
        </Button>
        {
        props.types.length > 0 && <TableContainer overflowX={'scroll'}>
          <Table variant={'simple'}
            size={'lg'}>
            <TableCaption placement={'top'}
              textAlign={
                {
                  'base': 'start',
                  'lg': 'center'
                }
            }>
              Table is scrollable horizontally and vertically.
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Actions</Th>
                <Th>ID</Th>
                <Th>Width</Th>
                <Th>Height</Th>
              </Tr>
            </Thead>
            <Tbody>{
              props.types.map((type) => {
                return (
                  <Tr key={
                      type.CustomAdTypeID
                    }
                    height={'100px'}>
                    <Td>
                      <Flex gap={4}
                        justifyContent={'center'}>
                        <FontAwesomeIcon icon={faEdit}
                          onClick={
                            (e) => handleClick(type.CustomAdTypeID !, 'UPDATE')
                          }
                          cursor={'pointer'}/>
                        <FontAwesomeIcon icon={faTrash}
                          onClick={
                            (e) => handleClick(type.CustomAdTypeID !, 'DELETE')
                          }
                          cursor={'pointer'}/>
                      </Flex>
                    </Td>
                    <Td textAlign={'center'}>
                      {
                      type.CustomAdTypeID
                    }</Td>
                    <Td isNumeric>
                      {
                      type.Width
                    }</Td>
                    <Td isNumeric>
                      {
                      type.Height
                    }</Td>
                  </Tr>
                )
              })
            } </Tbody>
          </Table>
        </TableContainer>
      } </Flex>
    </>
  );
};

export async function getServerSideProps({
  locale = 'en'
} : GetServerSidePropsContext) {
  const customAdTypes = await AdService.getAllAdTypes();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      types: customAdTypes
    }
  };
}

export default AdminAdTypeIndexPage;

