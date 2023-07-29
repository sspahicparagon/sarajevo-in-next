import { NextPage } from "next";
import { LocationService } from "../../../services/LocationService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SSRConfig } from "next-i18next";
import { LocationFull } from "../../../interfaces/LocationOverride";
import { useState } from "react";
import GroupService from "../../../services/GroupeService";
import { groupe } from "@prisma/client";
import { Flex, FormControl, FormLabel, Input, NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import axios, { HttpStatusCode } from "axios";
import { useRouter } from "next/router";

const initialValues: 
  LocationFull  = {
  'LocationID': -1,
  'Latitude': '',
  'Longitude': '',
  'Adresa': '',
  'Description': '',
  'GroupeID': 0,
  'Image': 'TEMPORARY',
  'Name': '',
  'Phone': '',
  'Website': ''
}

const AdminLocationForm: NextPage<SSRConfig & { location: LocationFull | null } & { groupes: groupe[] }> = (props) => {
  const [values, setValues] = useState(props.location ?? initialValues);
  const router = useRouter();

  const handleChange = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  }

  const createFormData = () => {
    return values;
  }

  return (
    <Flex
      direction={'column'}
      marginBlock={'3rem'}
      marginInline={'auto'}
      width={{'base': '100%', 'md': '500px'}}
    >
      <form
        action={'/api/location/add'}
        method={'POST'}
        encType="multipart/form-data"
        onSubmit={async (event) => {
          event.preventDefault();
          let data = createFormData();

          let result = await axios({
            method: 'POST',
            data: data,
            url: `/api/location/add`
          });

          if(result.status == HttpStatusCode.Ok) return router.push('/admin-location');
        }}
      >
        <FormControl isRequired>
          <FormLabel>Location Name</FormLabel>
          <Input 
            name="Name"
            type={'text'} 
            value={values.Name!}
            onChange={(e) => handleChange(e.currentTarget.name, e.currentTarget.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Groupe</FormLabel>
          <Select 
            name="GroupeID"
            value={values.GroupeID!} 
            onChange={(e) => handleChange(e.currentTarget.name, parseInt(e.currentTarget.value))}
          >
            {
              props.groupes.map(groupe => {
                return (
                  <option key={groupe.GroupeID} value={groupe.GroupeID}>{groupe.Name}</option>
                )
              })
            }
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Latitude</FormLabel>
          <NumberInput precision={18} value={values.Latitude!}>
              <NumberInputField name="Latitude" onChange={(e) => handleChange(e.currentTarget.name, e.currentTarget.value)}/>
          </NumberInput>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Longitude</FormLabel>
          <NumberInput precision={18} value={values.Longitude!}>
              <NumberInputField name="Longitude" onChange={(e) => handleChange(e.currentTarget.name, e.currentTarget.value)}/>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Location image</FormLabel>
          <Input
            type={'text'}
            value={values.Image!}
            disabled
          />
        </FormControl>
        <Input type={'submit'} value={'Save'}/>
      </form>
    </Flex>
  )
}

export async function getServerSideProps(context: any) {
  let location: LocationFull | null = null;

  // if(context.query.id != '-1')
  //   location = await LocationService.getLocation(context.query.id);

  const groupes = await GroupService.getGroupesAll();
  return {
      props: {
          ...(await serverSideTranslations(context.locale, ['common', 'footer', 'admin'])),
          location: location,
          groupes: groupes
      }
  };
}

export default AdminLocationForm;