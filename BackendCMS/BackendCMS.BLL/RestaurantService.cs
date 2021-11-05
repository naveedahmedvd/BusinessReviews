using BackendCMS.DAL;
using BackendCMS.DAL.Models;
using BackendCMS.DAL.Repository;
using BackendCMS.Models.AuthModels;
using BackendCMS.Models.Models.Restaurant;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public IEnumerable<Restaurant> Get()
        {
            return restaurantRepository.GetAll();
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
    }
}
