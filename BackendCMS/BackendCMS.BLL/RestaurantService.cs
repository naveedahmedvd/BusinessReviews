using BackendCMS.DAL;
using BackendCMS.DAL.Models;
using BackendCMS.DAL.Repository;
using BackendCMS.Models.AuthModels;
using BackendCMS.Models.DTOs;
using BackendCMS.Models.Models.Restaurant;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BackendCMS.BLL
{
    public class RestaurantService
    {
        private readonly CmsContext context;
        private readonly IRepository<Application> applicationRepository;
        private readonly IRepository<AspNetUsers> userRepository;
        private readonly IRepository<Restaurant> restaurantRepository;
        private readonly IRepository<Photo> photoRepository;
        private readonly IRepository<Timings> timingsRepository;
        private readonly IRepository<Review> reviewRepository;
        public RestaurantService(
            CmsContext context,
            IRepository<Application> applicationRepository,
            IRepository<Restaurant> restaurantRepository,
            IRepository<Photo> photoRepository,
            IRepository<Timings> timingsRepository,
            IRepository<Review> reviewRepository,
            IRepository<AspNetUsers> userRepository)
        {
            this.context = context;
            this.applicationRepository = applicationRepository;
            this.restaurantRepository = restaurantRepository;
            this.photoRepository = photoRepository;
            this.timingsRepository = timingsRepository;
            this.reviewRepository = reviewRepository;
            this.userRepository = userRepository;
        }

        public IEnumerable<Restaurant> Get(int page, string name,int[] priceLevel, string[] ratings, string[] timings)
        {
            var restuarants = restaurantRepository.GetAll("Reviews,Photos,Timings");
            var ratingTuples = ratings.Select(x =>
            {
                var str = x.Replace(" ", String.Empty);
                var items = str.Split('-');
                (double from, double to) result = (Convert.ToDouble(items[0]), Convert.ToDouble(items[1]));
                return result;
            });
            //var timingTuples = timings.Select(x =>
            //{
            //   // var str = x.Replace(" ", String.Empty);
            //    var items = x.Split('-');
            //    var fromHour = DateTime.Parse(items[0].Trim()).ToString("HH");
            //    var toHour = DateTime.Parse(items[1].Trim()).ToString("HH");
            //    (int from, int to) result = (Convert.ToInt16(fromHour), Convert.ToInt32(toHour));
            //    return result;
            //});
            var result = restuarants
                  .Where(x => (name == null || name == string.Empty 
                        || x.RestaurantName.Contains(name)) && 
                        (priceLevel.Length == 0 || priceLevel.Contains(x.PriceLevel)) &&
                        (ratingTuples.Count() == 0 || ratingTuples.Any(rt => x.Rating >= rt.from && x.Rating <= rt.to)))
                  .Skip((page - 1) * 10)
                  .Take(page * 10)
                  .OrderByDescending(x => x.Rating);
            return result;
        }

        public Restaurant Get(int id)
        {
            return restaurantRepository.GetById(id);
        }

        public Restaurant Add(Restaurant restaurant)
        {
            if (restaurantRepository.GetAllQueryable().Count(x => x.PlaceId == restaurant.PlaceId) > 0)
                throw new AlreadyExistsException();

            var timingsEntity = timingsRepository.Insert(restaurant.Timings);

            restaurant.TimingsId = timingsEntity.TimingsId;
            var restaurantEntity = restaurantRepository.Insert(restaurant);

            foreach (var review in restaurant.Reviews)
            {
                review.RestaurantId = restaurantEntity.RestaurantId;
                reviewRepository.Insert(review);
            }
            foreach (var photo in restaurant.Photos)
            {
                photo.RestaurantId = restaurantEntity.RestaurantId;
                photoRepository.Insert(photo);
            }
            context.SaveChanges();
            return restaurantEntity;
        }

        public void Delete(int id)
        {
            var restaurant = restaurantRepository.GetAllQueryable("Reviews,Photos,Timings").Where(x => x.RestaurantId == id).SingleOrDefault();
            foreach (var review in restaurant.Reviews)
            {
                reviewRepository.Delete(review.ReviewId);
            }
            foreach (var photo in restaurant.Photos)
            {
                photoRepository.Delete(photo.PhotoId);
            }
            restaurantRepository.Delete(id);
            timingsRepository.Delete(restaurant.TimingsId);
            context.SaveChanges();
        }
    }
}
