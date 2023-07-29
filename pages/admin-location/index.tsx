import { NextPage } from "next";
import { SSRConfig } from "next-i18next";
import { LocationFull } from "../../interfaces/LocationOverride";
import { Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { LocationService } from "../../services/LocationService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios, { HttpStatusCode } from "axios";
import { useRouter } from "next/router";


const AdminLocation: NextPage<SSRConfig & { locations: LocationFull[] }> = (props) => {
  const router = useRouter();
  const handle = async (locationID: number | undefined, action: string) => {
    if(action == 'DELETE') {
      let result = await axios({
        method: 'DELETE',
        url: `/api/location/${locationID}/delete`
      });

      if(result.status == HttpStatusCode.Ok) return router.reload();
    }

    if(action == 'EDIT' || action == 'ADD')
      return router.push(`/admin-location/${locationID}`);
  }

  return (  
    <Flex
      direction={'column'}
      align={'center'}
      marginBlock={'3rem'}
    >
      <Button
        onClick={(e) => handle(-1, 'ADD')}
        width={'150px'}
      >ADD LOCATION</Button>
      <TableContainer overflowX={'scroll'}>
        <Table 
          variant={'simple'} 
          size={'sm'}
        >
          <TableCaption 
            placement={'top'} 
            textAlign={{'base': 'start', 'lg': 'center'}}
          >
            Table is scrollable horizontally and vertically.
          </TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Location</Th>
              <Th>Groupe</Th>
              <Th w={'300px'}>Website</Th>
              <Th isNumeric>Latitude</Th>
              <Th isNumeric>Longitude</Th>
              <Th>Created</Th>
              <Th>Phone</Th>
              <Th>Image</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              props.locations.map(location => {
                return (
                  <Tr 
                    key={location.LocationID} 
                    height={'100px'}
                  >
                    <Td textAlign={'center'}>
                      {location.LocationID}
                    </Td>
                    <Td>{location.Name}</Td>
                    <Td>{location.groupe?.Name}</Td>
                    <Td 
                      width={'300px'}
                    >
                      <Text
                        overflow={'hidden'}
                        textOverflow={'ellipsis'}
                        whiteSpace={'nowrap'}
                        lineHeight={'17px'}
                        w={'300px'}
                      >
                        <Tooltip 
                          hasArrow 
                          label={location.Website ?? "Website wasn't provided"} 
                          aria-label={'Locations Website label'}
                          placement={'bottom-start'}
                        >
                          {location.Website ?? "Website wasn't provided"}
                        </Tooltip>
                      </Text>
                    </Td>
                    <Td isNumeric>{location.Latitude ?? "Latitude wasn't provided" }</Td>
                    <Td isNumeric>{location.Longitude ?? "Longitude wasn't provided"}</Td>
                    <Td>{location.CreatedAt?.toDateString()}</Td>
                    <Td>{location.Phone ?? "Phone wasn't provided"}</Td>
                    <Td>{location.Image ?? "Images wasn't provided"}</Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
};

const GridItemGeneric = ({text}: { text: string }) => {
  return (
    <GridItem
      alignContent={'center'}
      justifyContent={'center'}
      fontSize={'large'}
    >
      {text}
    </GridItem>
  )
}

export async function getServerSideProps(context: any) {
  const locations = await LocationService.getAllLocations();
  return {
      props: {
          ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
          locations: locations
      }
  };
}

export default AdminLocation;