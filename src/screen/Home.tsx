import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {SliderBox} from 'react-native-image-slider-box';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    require('../assets/id1.jpeg'),
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
          <Text style={styles.th}>ABOGA</Text>
          <View style={{flexDirection: 'row', right: 10}}>
            <Icon name="magnify" size={hp('5.5%')} color={'black'} />
            <Icon name="menu" size={hp('5.5%')} color={'black'} />
          </View>
        </View>
        <View style={styles.container1}>
          <SliderBox
            images={images}
            onCurrentImagePressed={handleImagePress}
            autoplay={true}
            currentIndex={currentIndex}
            circleLoop={true}
            ImageComponent={Image}
            ImageComponentStyle={styles.sliderImage}
          />
        </View>
        <ScrollView
          style={{
            width: wp('100%'),
            height: hp('30%'),
          }}>
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
  imgap: {
    width: wp('30%'),
    height: hp('15%'),
    left: hp('3.8%'),
    top: hp('1%'),
  },
  container: {
    flex: 1,
  },
  container1: {
    width: wp('100%'),
    height: hp('30%'),
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: wp('100%'),
    height: hp('5.5%'),
    backgroundColor: '#20C0CA',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productContainer: {
    width: wp('45%'),
    height: hp('31%'),
    backgroundColor: '#20C0CA',
    margin: hp('1%'),
  },
  title: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    top: hp('1.8%'),
    left: hp('1%'),
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
    left: hp('1.2%'),
    top: hp('4.3%'),
  },
  belitxt: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: 'white',
  },
});
