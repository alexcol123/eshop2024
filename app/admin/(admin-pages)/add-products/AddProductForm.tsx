'use client'

import Heading from '@/app/components/Heading'
import MyButton from '@/app/components/MyButton'
import CategoryInput from '@/app/components/inputs/CategoryInput'
import CustomCheckBox from '@/app/components/inputs/CustomCheckBox'
import SelectColor from '@/app/components/inputs/SelectColor'
import TextArea from '@/app/components/inputs/TextArea'
import Input from '@/app/components/inputs/input'
import firebaseApp from '@/libs/firebase'
import { categories } from '@/utils/Categories'
import { colors } from '@/utils/Colors'
import { register } from 'module'
import { useCallback, useEffect, useState } from 'react'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export type ImageType = {
  color: string,
  colorCode: string,
  image: File | null
}

export type UploadedImageType = {
  color: string,
  colorCode: string,
  image: string
}

const AddProductForm = () => {

  const router = useRouter()

  const [isLoading, setisLoading] = useState(false)
  const [images, setimages] = useState<ImageType[] | null>(null)
  const [isProductCreated, setisProductCreated] = useState(false)







  const {
    register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
      defaultValues: {
        name: '',
        description: '',
        brand: '',
        category: '',
        inStock: false,
        images: [],
        price: ''
      }
    })






  const category = watch('category')

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true, shouldDirty: true, shouldTouch: true
    })
  }


  const addImageToState = useCallback((value: ImageType) => {
    setimages((prev) => {
      if (!prev) {
        return [value]
      }

      return [...prev, value]
    })

  }, [])

  const removeImageFromState = useCallback((value: ImageType) => {
    setimages((prev) => {
      if (prev) {
        const filteredImages = prev.filter((item) => item.color !== value.color)
        return filteredImages
      }

      return prev
    })

  }, [])


  useEffect(() => {
    setCustomValue('images', images)
  }, [images])


  useEffect(() => {
    if (isProductCreated) {
      reset()
      setimages(null)
      setisProductCreated(false)
    }
  }, [isProductCreated])


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Product data', data)

    // upload  imaged to firebase

    // save product to mongodb

    setisLoading(true)
    let uploadedImages: UploadedImageType[] = []

    if (!data.category) {
      setisLoading(false)
      return toast.error('Category is not selected')
    }

    if (!data.images || data.images.length === 0) {
      setisLoading(false)
      return toast.error('No Selected Image!')
    }

    const handleImageUploads = async () => {
      toast("Creating product , please wait...")

      // For more info you can go to firebase docs at
      // https://firebase.google.com/docs/storage/web/upload-files

      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + '-' + item.image.name
            const storage = getStorage(firebaseApp)
            const storageRef = ref(storage, `products/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, item.image)

            await new Promise<void>((resolve, reject) => {
              uploadTask.on('state_changed', (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }

              },
                (error) => {
                  // Handle unsuccessful uploads
                  console.log("Error uploading image", error)
                  reject(error)
                },


                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).
                    then((downloadURL) => {
                      uploadedImages.push({ ...item, image: downloadURL })
                      console.log('File available at', downloadURL);
                      return resolve()

                    }).catch((error) => {
                      return reject(error)
                    });
                }

              )
            })
          }
        }
      } catch (error) {
        setisLoading(false)
        console.log('Error handling image uploads', error)
        return toast.error('Error handling image uploads')
      }
    }

    // call the image uploads func and wait for images to be uploaded to Firebase  
    await handleImageUploads()

    // After uploads 
    const productData = { ...data, images: uploadedImages }

    // console.log(productData)

    // Save to mongodb 
    axios.post('/api/product', productData).then(() => {
      toast.success("Product Created ")
      setisProductCreated(true)
      router.refresh()
    }).catch((error) => {
      toast.error('Something went wrong')
    }).finally(() => {
      setisLoading(false)
    })

  }

  return (
    <>
      <Heading title='Add A Product' center />
      <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />

      <Input id='price' label='Price' type='number' disabled={isLoading} register={register} errors={errors} required />

      <Input id='brand' label='Brand' disabled={isLoading} register={register} errors={errors} required />

      < TextArea id='description' label='Description' disabled={isLoading} register={register} errors={errors} required />

      <CustomCheckBox id='inStock' register={register} label='This product is in stock ?' />


      {/* Categories */}
      <div className='w-full font-medium'>
        <div className='mb-2 font-semibold'>
          Select Category
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === 'All') return null

            return <div key={item.label} className=''>
              <CategoryInput
                label={item.label}
                icon={item.icon}
                onClick={(category) => setCustomValue('category', category)}
                selected={category == item.label}
              />
            </div>

          })}
        </div>
      </div>

      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the available product colors and upload their images
          </div>
          <div className='text-sm'>
            You must select an image for each of the colors selected otherwise your color section will be ignored
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {colors.map((item, index) => {
            return <SelectColor
              key={index} item={item}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
              isProductCreated={isProductCreated} />
          })}
        </div>

      </div>

      <MyButton label={isLoading ? 'Loading...' : 'Add Product'} onClick={handleSubmit(onSubmit)} />

    </>
  )
}

export default AddProductForm