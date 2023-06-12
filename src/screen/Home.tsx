import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {SliderBox} from 'react-native-image-slider-box';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductListResponse {
  products: Product[];
}

const Home = () => {
  const images = [
    require('../assets/id.jpeg'),
    require('../assets/d.png'),
    require('../assets/id2.jpeg'),
  ];

  const handleImagePress = (index: number) => {
    console.warn(`image ${index} pressed`);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [images.length]);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then((data: ProductListResponse) => {
        const productList = data.products.map(product => ({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          category: product.category,
          thumbnail: product.thumbnail,
          images: product.images,
        }));
        setProducts(productList);
      })
      .catch(error => console.log('error', error));
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9444C4', '#20C0CA']}
        style={styles.background}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Cari Barang"
              placeholderTextColor="gray"
              style={styles.textInput}
            />
          </View>
          <View style={styles.conimgheader}>
            <Image
              style={styles.iconheader}
              source={require('../assets/cart.png')}
            />
          </View>
          <View style={styles.conimgheader}>
            <Image
              style={styles.iconheader}
              source={require('../assets/chat.png')}
            />
          </View>
        </View>
        <ScrollView
          style={{
            width: wp('100%'),
            height: hp('30%'),
          }}>
          <SliderBox
            images={images}
            onCurrentImagePressed={handleImagePress}
            autoplay={true}
            currentIndex={currentIndex}
            circleLoop={true}
            ImageComponent={Image}
            ImageComponentStyle={styles.sliderImage}
          />
          <View style={styles.productsContainer}>
            {products.map((product, index) => (
              <View style={styles.productContainer} key={index}>
                <Image source={{uri: product.thumbnail}} style={styles.imgap} />
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <TouchableOpacity style={styles.beli}>
                  <Text style={styles.belitxt}>Beli</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    top: hp('2%'),
    left: hp('1'),
    zIndex: 1,
  },
  th: {
    fontSize: hp('3.5%'),
    color: 'black',
    fontWeight: 'bold',
    left: hp('1.5%'),
  },
  sliderImage: {
    width: wp('100%'),
    height: hp('30%'),
  },
  searchContainer: {
    width: wp('70%'),
    backgroundColor: 'white',
    height: hp('5.5%'),
    borderWidth: 1,
    borderRadius: 10,
  },
  textInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: wp('2%'),
    color: 'black',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productContainer: {
    width: wp('45%'),
    height: hp('33%'),
    backgroundColor: '#20C0CA',
    margin: hp('1%'),
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center',
  },
  imgap: {
    width: wp('38%'),
    height: hp('15%'),
    borderRadius: 20,
    top: hp('1.2%'),
  },
  title: {
    fontSize: hp('1.7%'),
    top: hp('1.8%'),
    color: 'black',
  },
  price: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: 'green',
    top: hp('3'),
    left: hp('1%'),
  },
  beli: {
    backgroundColor: 'blue',
    width: wp('40%'),
    height: hp('5%'),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('4.3%'),
  },
  belitxt: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: 'white',
  },
  conimgheader: {
    backgroundColor: 'blue',
    width: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: hp('0.7%'),
    borderRadius: 7,
    elevation: 10,
  },
  iconheader: {
    width: wp('8%'),
    height: hp('4%'),
  },
});
